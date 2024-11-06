import { prisma } from "@/utils/server";
import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
  try {
    const { datePlanId } = params;
    const isValid = datePlanId;
    if (!isValid)
      return NextResponse.json(
        { success: false, message: "Bad Request!" },
        { status: 400 }
      );
    const datePlan = await prisma.datePlans.findFirst({
      where: {
        id: Number(datePlanId),
      },
    });

    if (!datePlan)
      return NextResponse.json(
        { success: false, message: "Date Plan doesn't exist" },
        { status: 404 }
      );

    const [datePlaces, dateFoods, dateDrinks, datePlanTypes] =
      await Promise.all([
        prisma.datePlanPlaces.findMany({ where: { datePlanId: datePlan.id } }),
        prisma.datePlanFoods.findMany({ where: { datePlanId: datePlan.id } }),
        prisma.datePlanDrinks.findMany({ where: { datePlanId: datePlan.id } }),
        prisma.datePlanDateTypes.findMany({
          where: { datePlanId: datePlan.id },
        }),
      ]);

    const datePlaceIds = datePlaces.map((place) => place.placeId);
    const dateFoodIds = dateFoods.map((food) => food.foodId);
    const dateDrinkIds = dateDrinks.map((drink) => drink.drinkId);
    const datePlanTypeIds = datePlanTypes.map(
      (dateType) => dateType.dateTypeId
    );

    const [places, foods, drinks, dateTypes] = await Promise.all([
      prisma.places.findMany({ where: { id: { in: datePlaceIds } } }),
      prisma.foods.findMany({ where: { id: { in: dateFoodIds } } }),
      prisma.drinks.findMany({ where: { id: { in: dateDrinkIds } } }),
      prisma.dateTypes.findMany({ where: { id: { in: datePlanTypeIds } } }),
    ]);

    return NextResponse.json(
      {
        success: true,
        datePlan: {
          dayToDate: datePlan.dayToDate,
          timeToDate: datePlan.timeToDate,
          places,
          foods,
          drinks,
          dateTypes,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
