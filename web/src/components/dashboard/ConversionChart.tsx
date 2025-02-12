import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { ChartContainer, ChartTooltip } from "../Ui/chart";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Documents", value: 45, color: "#0EA5E9" },
  { name: "Images", value: 30, color: "#38BDF8" },
  { name: "Archives", value: 25, color: "#7DD3FC" },
];

export const ConversionChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Conversion Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <ChartTooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
