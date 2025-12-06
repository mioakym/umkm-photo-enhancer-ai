export async function POST(req: Request, context: { params: { scale: string }}) {
    const { scale } = await context.params

    const allowed = ["2", "4", "6", "8"]

    if (!allowed.includes(scale)) {
        return new Response("Invalid upscale value", { status: 400 })
    }

    try {
        const form = await req.formData()
        const file = form.get("file") as File | null

        if (!file) {
            return new Response("File is required", { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const backendUrl = `${process.env.LOCAL_MODEL_BACKEND_URL}/upscale-${scale}`

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
    } catch (err) {
        console.error(err)
        return new Response("Upscale failed", { status: 500 })
    }
}