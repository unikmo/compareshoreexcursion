import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminCountriesPage() {
  await requireRole(["ADMIN"]);
  const countries = await prisma.country.findMany({ include: { regions: true }, orderBy: { name: "asc" } });
  return <SimpleTable title="Countries" headers={["Name", "Code", "Regions"]} rows={countries.map((item) => [item.name, item.code, item.regions.length])} />;
}

function SimpleTable({ title, headers, rows }: { title: string; headers: string[]; rows: Array<Array<string | number>> }) {
  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>{title}</h1>
      <table className="data-table"><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table>
    </main>
  );
}
