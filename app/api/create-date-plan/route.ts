import { prisma } from "@/utils/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { dayToDate, timeToDate, placeIds, foodIds, drinkIds, dateTypeIds } =
      await request.json();

    const isValid =
      dayToDate &&
      timeToDate &&
      placeIds.length &&
      foodIds.length &&
      drinkIds.length &&
      dateTypeIds.length;

    if (!isValid)
      return NextResponse.json(
        { message: "Bad Request!", success: false },
        { status: 400 }
      );

    const newDatePlan = await prisma.datePlans.create({
      data: {
        dayToDate,
        timeToDate,
      },
    });

    await Promise.all(
      placeIds.map((placeId: number) =>
        prisma.datePlanPlaces.create({
          data: {
            datePlanId: newDatePlan.id,
            placeId,
          },
        })
      )
    );

    await Promise.all(
      foodIds.map((foodId: number) =>
        prisma.datePlanFoods.create({
          data: {
            datePlanId: newDatePlan.id,
            foodId,
          },
        })
      )
    );

    await Promise.all(
      drinkIds.map((drinkId: number) =>
        prisma.datePlanDrinks.create({
          data: {
            datePlanId: newDatePlan.id,
            drinkId,
          },
        })
      )
    );

    await Promise.all(
      dateTypeIds.map((dateTypeId: number) =>
        prisma.datePlanDateTypes.create({
          data: {
            datePlanId: newDatePlan.id,
            dateTypeId,
          },
        })
      )
    );

    return NextResponse.json(
      {
        success: true,
        message: "Date Plan created successfully!!",
        data: { datePlanId: newDatePlan.id },
      },
      { status: 200 }
    );
  } catch (error) {
    //@ts-ignore
    console.log(error.message);
    return NextResponse.json(
      { message: "Error creating Date Plan!!", success: false },
      { status: 500 }
    );
  }
}
