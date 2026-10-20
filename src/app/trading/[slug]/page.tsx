import { notFound } from "next/navigation";
import { PageHeader, FutureList } from "@/components/ui";
import { tradingCategories } from "@/data/trading";
import { MarketChart } from "@/components/market-chart";
export function generateStaticParams() {
  return tradingCategories.map((x) => ({ slug: x.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    item = tradingCategories.find((x) => x.slug === slug);
  if (!item) notFound();
  return (
    <>
      <PageHeader
        title={item.title}
        description={item.shortDescription}
      />
      <MarketChart />
      <section className="my-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="surface rounded-[28px] p-6 sm:p-8">
          <p className="muted text-xs uppercase tracking-[.14em]">
            Как это работает
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-.04em]">
            Главное — простыми словами
          </h2>
          <p className="muted mt-4 max-w-2xl leading-7">{item.description}</p>
        </div>
        <div className="surface rounded-[28px] p-6 sm:p-8">
          <div className="mb-6">
            <p className="muted text-xs">Уровень риска</p>
            <p className="mt-1 text-lg font-semibold">{item.risk}</p>
          </div>
          <div>
            <p className="muted text-xs">Горизонт</p>
            <p className="mt-1 text-lg font-semibold">
              {item.horizon || "Зависит от стратегии"}
            </p>
          </div>
        </div>
      </section>
      <FutureList
        items={[
          "Доступные алгоритмы",
          "Исторические результаты",
          "Риски и объяснения",
          "Минимальный капитал",
          "Стоимость использования",
          "Запуск демо",
          "Сравнение стратегий",
        ]}
      />
    </>
  );
}
