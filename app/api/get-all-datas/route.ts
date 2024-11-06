import { prisma } from "@/utils/server";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  try {
    const places = await prisma.places.findMany();
    const foods = await prisma.foods.findMany();
    const drinks = await prisma.drinks.findMany();
    const dateTypes = await prisma.dateTypes.findMany();
    return NextResponse.json(
      { success: true, datas: { places, foods, drinks, dateTypes } },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
