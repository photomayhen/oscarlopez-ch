import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { supabase } from '@/integrations/supabase/client';

interface VisitorData {
  id: string;
  city: string | null;
  country: string | null;
  visited_at: string;
}

interface AnalyticsStats {
  totalVisitors: number;
  weeklyVisitors: number;
  monthlyVisitors: number;
  topCountries: { country: string; count: number }[];
  topCities: { city: string; count: number }[];
  dailyStats: { date: string; count: number }[];
}

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: visitors, error } = await supabase
        .from('visitor_analytics')
        .select('*')
        .order('visited_at', { ascending: false });

      if (error) throw error;

      if (visitors) {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const weeklyVisitors = visitors.filter(v => new Date(v.visited_at) >= oneWeekAgo);
        const monthlyVisitors = visitors.filter(v => new Date(v.visited_at) >= oneMonthAgo);

        // Top countries
        const countryCount = visitors.reduce((acc, visitor) => {
          if (visitor.country) {
            acc[visitor.country] = (acc[visitor.country] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);

        const topCountries = Object.entries(countryCount)
          .map(([country, count]) => ({ country, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // Top cities
        const cityCount = visitors.reduce((acc, visitor) => {
          if (visitor.city) {
            acc[visitor.city] = (acc[visitor.city] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);

        const topCities = Object.entries(cityCount)
          .map(([city, count]) => ({ city, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // Daily stats for the last 30 days
        const dailyStats = [];
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          const dateStr = date.toISOString().split('T')[0];
          const count = visitors.filter(v => 
            new Date(v.visited_at).toISOString().split('T')[0] === dateStr
          ).length;
          dailyStats.push({ date: dateStr, count });
        }

        setStats({
          totalVisitors: visitors.length,
          weeklyVisitors: weeklyVisitors.length,
          monthlyVisitors: monthlyVisitors.length,
          topCountries,
          topCities,
          dailyStats
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Failed to load analytics data.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Website visitor analytics for oscarlopez.ch</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisitors}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Visitors</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weeklyVisitors}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Visitors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyVisitors}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="countries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="countries">Top Countries</TabsTrigger>
          <TabsTrigger value="cities">Top Cities</TabsTrigger>
          <TabsTrigger value="daily">Daily Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="countries">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Top Countries
              </CardTitle>
              <CardDescription>Countries with the most visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topCountries.map((country, index) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </span>
                      <span>{country.country}</span>
                    </div>
                    <span className="font-medium">{country.count} visitors</span>
                  </div>
                ))}
                {stats.topCountries.length === 0 && (
                  <p className="text-muted-foreground text-sm">No country data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Top Cities
              </CardTitle>
              <CardDescription>Cities with the most visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topCities.map((city, index) => (
                  <div key={city.city} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </span>
                      <span>{city.city}</span>
                    </div>
                    <span className="font-medium">{city.count} visitors</span>
                  </div>
                ))}
                {stats.topCities.length === 0 && (
                  <p className="text-muted-foreground text-sm">No city data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Daily Visitors (Last 30 Days)
              </CardTitle>
              <CardDescription>Daily visitor count over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {stats.dailyStats.map((day) => (
                  <div key={day.date} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {new Date(day.date).toLocaleDateString()}
                    </span>
                    <span className="font-medium">{day.count} visitors</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;