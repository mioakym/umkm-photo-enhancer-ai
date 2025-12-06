export async function POST(req: Request, context: { params: { bg: string }}) {
    const { bg } = await context.params

    const allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

    if (!allowed.includes(bg)) {
        return new Response("Invalid remove_bg value", { status: 400 })
    }

    try {
        const form = await req.formData()
        const file = form.get("file") as File | null

        if (!file) {
            return new Response("File is required", { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const backendUrl = `${process.env.LOCAL_MODEL_BACKEND_URL}/remove_bg-${bg}`

        const backendForm = new FormData()
        backendForm.append(
            "file",
            new Blob([buffer], { type: file.type }),
            file.name
        )

        const result = await fetch(backendUrl, {
            method: "POST",
            body: backendForm
        })

        if (!result.ok) {
            const err = await result.text()
            return new Response("Backend error: " + err, { status: 500 })
        }

        const blob = await result.arrayBuffer()

        return new Response(blob, {
            headers: {
                "Content-Type": "image/png",
            },
        })
    } catch {
        return new Response("Remove Background failed", { status: 500 })
    }
}