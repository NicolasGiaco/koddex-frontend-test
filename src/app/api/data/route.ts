import { NextResponse } from "next/server"
import { createLoadTreeUseCase } from "@/factories/use-case.factory"

export async function GET() {
  try {
    const loadTreeUseCase = createLoadTreeUseCase()

    const tree = await loadTreeUseCase.execute()

    return NextResponse.json({ data: tree })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
