import {
  Container,
  ProductGroupList,
  Title,
  TopBar,
} from "@/components/shared";
import { Filters } from "@/components/shared/Filters";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-[50px]">
              <ProductGroupList
                title="Пиццы"
                categoryId={1}
                products={[
                  {
                    id: "1",
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D6105EF6690B86FBDE6150B5B0C.avif",
                    price: 419,
                    items: [{ price: 419 }],
                  },
                  {
                    id: "2",
                    name: "Цыпленок ранч",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.avif",
                    price: 539,
                    items: [{ price: 539 }],
                  },
                  {
                    id: "3",
                    name: "Гавайская",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D617E9339CFB185921A343AD8FD.avif",
                    price: 439,
                    items: [{ price: 439 }],
                  },
                  {
                    id: "4",
                    name: "Ветчина и грибы",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EF5B10B39BBBBDA9F8C4E4FF1B067C.avif",
                    price: 499,
                    items: [{ price: 499 }],
                  },
                  {
                    id: "5",
                    name: "Диабло",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D6149EB101D8727573088FA2EFF.avif",
                    price: 499,
                    items: [{ price: 499 }],
                  },
                  {
                    id: "6",
                    name: "Цыпленок барбекю",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif",
                    price: 509,
                    items: [{ price: 509 }],
                  },
                  {
                    id: "7",
                    name: "Четыре сезона",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif",
                    price: 489,
                    items: [{ price: 489 }],
                  },
                  {
                    id: "8",
                    name: "Пепперони",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif",
                    price: 489,
                    items: [{ price: 489 }],
                  },
                  {
                    id: "9",
                    name: "Песто",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D613B84A5DBB4C1C50FB9583B7E.avif",
                    price: 529,
                    items: [{ price: 529 }],
                  },
                ]}
              />
              <ProductGroupList
                title="Комбо"
                categoryId={2}
                products={[
                  {
                    id: "10",
                    name: "Вкусное путешествие",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EF606ABC9B5B9182B8F7BF74514AE1.avif",
                    price: 1379,
                    items: [{ price: 1379 }],
                  },
                  {
                    id: "11",
                    name: "Чикен бокс",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEB05826E64288A83EFCF67DA86AAE.avif",
                    price: 249,
                    items: [{ price: 249 }],
                  },
                  {
                    id: "12",
                    name: "3 пиццы",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7E219680B50B85AD6F6813EA1902.avif",
                    price: 1239,
                    items: [{ price: 1239 }],
                  },
                  {
                    id: "13",
                    name: "2 пиццы и напиток",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7E219288C341B5C27167329C2C9A.avif",
                    price: 859,
                    items: [{ price: 859 }],
                  },
                  ,
                  {
                    id: "14",
                    name: "Четыре в одном",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEB0721E536EECA59C7BE93DC7E723.avif",
                    price: 629,
                    items: [{ price: 629 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
