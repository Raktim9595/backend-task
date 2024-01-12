"use client";
import React from "react";

import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { PATH } from "@/helpers/paths";

const NavigationBar = () => {
	return (
		<Box
			component={"nav"}
			display={"flex"}
			alignItems={"center"}
			justifyContent={"space-between"}
			borderBottom={"1px solid #E0E0E0"}
			padding={"1rem 1.5rem"}
			height={"3rem"}
			sx={{ position: "sticky", top: "0", zIndex: 100, bgcolor: "#FFFFFF" }}
		>
			<Link href={"/"}>
				<Typography variant={"h6"}>Power Grid</Typography>
			</Link>

			<Stack direction={"row"} alignItems={"center"} gap={"1rem"} pr={"5rem"}>
				<Link href={PATH.ROOT}>
					<Typography variant={"body1"}>Home</Typography>
				</Link>
				<Link href={PATH.BATTERIES.ROOT}>
					<Typography variant={"body1"}>Batteries</Typography>
				</Link>
				<Link href={PATH.BATTERIES.ADD.ROOT}>
					<Typography>Add Batteries</Typography>
				</Link>
			</Stack>
		</Box>
	);
};

export default NavigationBar;
