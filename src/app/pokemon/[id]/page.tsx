"use client";
import dynamic from "next/dynamic";
import { useCustomQuery } from "@/customHooks/useCustomQuery";
import React, { useEffect, useState } from "react";
import { GET_POKEMON_API } from "../../../../apis/api";
import styled from "styled-components";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Params {
  id: string;
}

const Pokemon = ({ params }: { params: Params }) => {
  let options: any = {
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {
            // console.log(chart, w, e);
          },
        },
      },
      colors: ["#ffc200", "#5e2bff", "#ff80a3"],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: ["#ffc200", "#5e2bff", "#ff80a3"],
            fontSize: "12px",
          },
        },
      },
    },
  };
  const allPokemonsQuery = useCustomQuery(
    `${GET_POKEMON_API}/${params.id}/`,
    `pokemonData${params.id}`
  );
  console.log("id ===>", params, allPokemonsQuery.data);
  let stats: number[] = [];
  let statName: string[] = [];
  allPokemonsQuery.data?.stats?.forEach((item: any) => {
    stats.push(item.base_stat);
    statName.push(item.stat.name);
  });
  if (statName.length > 0 && statName.length === stats.length) {
    options = {
      ...options,
      xaxis: {
        ...options.xaxis,
        categories: statName,
      },
    };
  }
  console.log("stats === ", stats, options);
  return (
    <div>
      <p>
        {allPokemonsQuery?.data?.name}
        {" # "}
        {allPokemonsQuery?.data?.id}
      </p>
      <p>
        {"base exp"}
        {" # "}
        {allPokemonsQuery?.data?.base_experience}
      </p>
      <p>
        {"height : "}
        {allPokemonsQuery?.data?.height}
        {" / "}
        {"weight : "}
        {allPokemonsQuery?.data?.weight}
      </p>
      {allPokemonsQuery?.data?.types?.map((elem: any) => (
        <p key={elem.slot}>{elem?.type?.name} </p>
      ))}
      <img src={allPokemonsQuery?.data?.sprites?.front_default} alt="sprite" />
      {options.xaxis?.categories?.length > 0 &&
        typeof window !== "undefined" && (
          <BarChartContainer>
            <ReactApexChart
              options={options}
              series={[{ data: stats }]}
              type="bar"
              height={350}
              width={350}
            />
          </BarChartContainer>
        )}
      <table
        style={{
          overflowY: "scroll",
          height: "350px",
          display: "block",
          border: "1px solid grey",
          marginTop: "20px",
          borderRadius: "8px",
          width: "350px",
        }}
      >
        {allPokemonsQuery?.data?.moves?.map((move: any, i: number) => (
          <tr key={i}>
            <td>{`#${i}`}</td>
            <td>{move.move.name}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

const BarChartContainer = styled.div`
  border: 1px solid grey;
  border-radius: 8px;
  padding: 8px;
  width: 350px;
`;

export default Pokemon;
