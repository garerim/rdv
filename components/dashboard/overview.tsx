"use client"

import { UserProfile } from "@prisma/client"
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface OverviewProps {
  user: UserProfile;
  overviewData: number[];
}

export function Overview({ user, overviewData }: OverviewProps) {

  // const [data, setData] = useState<{}[]>([])
  var data = [
    {
      name: "Jan",
      total: overviewData && overviewData[0] * (user.prixPcr || 0)
    },
    {
      name: "Fev",
      total: overviewData && overviewData[1] * (user.prixPcr || 0)
    },
    {
      name: "Mar",
      total: overviewData && overviewData[2] * (user.prixPcr || 0)
    },
    {
      name: "Avr",
      total: overviewData && overviewData[3] * (user.prixPcr || 0)
    },
    {
      name: "Mai",
      total: overviewData && overviewData[4] * (user.prixPcr || 0)
    },
    {
      name: "Juin",
      total: overviewData && overviewData[5] * (user.prixPcr || 0)
    },
    {
      name: "Juil",
      total: overviewData && overviewData[6] * (user.prixPcr || 0)
    },
    {
      name: "Aout",
      total: overviewData && overviewData[7] * (user.prixPcr || 0)
    },
    {
      name: "Sep",
      total: overviewData && overviewData[8] * (user.prixPcr || 0)
    },
    {
      name: "Oct",
      total: overviewData && overviewData[9] * (user.prixPcr || 0)
    },
    {
      name: "Nov",
      total: overviewData && overviewData[10] * (user.prixPcr || 0)
    },
    {
      name: "Dec",
      total: overviewData && overviewData[11] * (user.prixPcr || 0)
    }
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}€`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}