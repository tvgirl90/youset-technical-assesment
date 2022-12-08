interface InsurancePackage {
    id: string;
    insurerName: string;
    description: string;
    price: string;
}

const insuranceData: InsurancePackage[] = [
    {
        id: "Package#1",
        insurerName: "Proteco Insurance",
        description: "Our most affordable package. Your personal belongings will be covered up to 15k$. This is perfect if you own a few belongings.",
        price: "12.50"
    },
    {
        id: "Package#2",
        insurerName: "Umbrella Insurance",
        description: "Our most popular package. Your personal belongings will be covered up to 30k$. This package also includes a free water sensor to detect a water leak in your home.",
        price: "35.73"
    },
    {
        id: "Package#3",
        insurerName: "Thor Insurance",
        description: "Nothing but the best. Your personal belongings will be covered up to 100k$. It even includes a protection against an alien invasion.",
        price: "79.30"
    },
]

export default insuranceData;