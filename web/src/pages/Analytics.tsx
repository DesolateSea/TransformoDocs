import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer 
} from "recharts";
import { Download, Calendar as CalendarIcon } from "lucide-react";

const apiData = [
  { name: "Jan 1", Team1: 4000, Team2: 2400 },
  { name: "Jan 2", Team1: 3000, Team2: 1398 },
  { name: "Jan 3", Team1: 2000, Team2: 9800 },
  { name: "Jan 4", Team1: 2780, Team2: 3908 },
  { name: "Jan 5", Team1: 1890, Team2: 4800 },
];

const costData = [
  { name: "Week 1", OCR: 4000, AI: 2400 },
  { name: "Week 2", OCR: 3000, AI: 1398 },
  { name: "Week 3", OCR: 2000, AI: 9800 },
  { name: "Week 4", OCR: 2780, AI: 3908 },
];

const teamData = [
  { id: 1, user: "John Doe", lastActive: "2 hours ago", creditsUsed: 1250, favoriteTools: "OCR, PDF Convert" },
  { id: 2, user: "Jane Smith", lastActive: "5 minutes ago", creditsUsed: 850, favoriteTools: "Image Processing" },
  { id: 3, user: "Mike Johnson", lastActive: "1 day ago", creditsUsed: 2100, favoriteTools: "Document Scanner" },
];

const Analytics = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Select>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Custom range</option>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={apiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Team1" stroke="#8884d8" />
                <Line type="monotone" dataKey="Team2" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="OCR" stackId="a" fill="#8884d8" />
                <Bar dataKey="AI" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Team Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Last Active</th>
                  <th className="px-6 py-3">Credits Used</th>
                  <th className="px-6 py-3">Favorite Tools</th>
                </tr>
              </thead>
              <tbody>
                {teamData.map((row) => (
                  <tr key={row.id} className="border-b dark:border-gray-700">
                    <td className="px-6 py-4">{row.user}</td>
                    <td className="px-6 py-4">{row.lastActive}</td>
                    <td className="px-6 py-4">{row.creditsUsed}</td>
                    <td className="px-6 py-4">{row.favoriteTools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;