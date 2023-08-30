import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Select, MenuItem, Stack, Box, Typography } from "@mui/material";
import RepoHighcharts from "./RepoHighcharts";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ACTIVITY_DATA } from "../redux/types/activityType";
import RepoSkeleton from "./RepoSkeleton";

const RepoCharts = ({ repo, owner }) => {
  const dispatch = useDispatch();
  const [activity, setActivity] = useState("c");
  const {
    activityData,
    contributorsData,
    loadingState,
    errorState
  } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch({
      type: FETCH_ACTIVITY_DATA,
      payload: {
        repo,
        owner
      }
    });
  }, []);

  const fromUnixToLocal = (time) => {
    return moment.unix(time).format("DD-MM-YYYY");
  };

  let totalTooltip = {
    formatter: function () {
      return `<p><b>Week:</b> ${this.x}</p><br><p><b>Changes:</b> ${this.y}</p>`;
    }
  };

  let contributorTooltip = {
    formatter: function () {
      return `<p><b>Week:</b> ${this.x}</p><br><p><b>Changes:</b> ${this.y}</p><br><p><b>Contributor:</b> ${this.series.name}</p>`;
    }
  };

  let totalWeeks =
    activityData.length > 0
      ? activityData.map((item) => fromUnixToLocal(item.week))
      : [];

  let totalSeries = [
    {
      type: "line",
      name:
        activity === "c"
          ? "Commits"
          : activity === "a"
          ? "Additions"
          : "Deletations",
      data:
        activityData.length > 0
          ? activityData.map((item) => Math.abs(item[activity]))
          : []
    }
  ];

  let contributorSeries =
    contributorsData.length > 0
      ? contributorsData.map((con) => {
          return {
            type: "line",
            name: con.author,
            data: con.weeks.map((week) => Math.abs(week[activity]))
          };
        })
      : [];

  return (
    <>
      {loadingState ? (
        <RepoSkeleton />
      ) : activityData.length > 0 ? (
        <Stack spacing={2} sx={{ marginTop: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Select
              value={activity}
              onChange={(e) => {
                setActivity(e.target.value);
              }}
              sx={{
                width: 130,
                height: 40
              }}
            >
              <MenuItem value="c">Commits</MenuItem>
              <MenuItem value="a">Additions</MenuItem>
              <MenuItem value="d">Deletations</MenuItem>
            </Select>
          </Box>
          <RepoHighcharts
            title="Total"
            xAxisCategories={totalWeeks}
            tooltip={totalTooltip}
            series={totalSeries}
          />

          <RepoHighcharts
            title="Contributor"
            xAxisCategories={totalWeeks}
            tooltip={contributorTooltip}
            series={contributorSeries}
          />
        </Stack>
      ) : errorState ? (
        <Message message="Something Went Wrong !!!" />
      ) : (
        <Message message="No Activity Data Available" />
      )}
    </>
  );
};

const Message = ({ message }) => {
  return (
    <Stack
      spacing={2}
      sx={{
        marginTop: 2
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        height={650}
      >
        <Typography variant="h5" component="p">
          {message}
        </Typography>
      </Box>
    </Stack>
  );
};

export default RepoCharts;
