import React from "react";
import AddBatteriesPageView from "./AddBatteriesPageView";
import { useAddBatteriesHooks } from "./useAddBatteries";

const AddBatteriesPage = () => {
	const addBatteriesPageViewProps = useAddBatteriesHooks();
	return <AddBatteriesPageView {...addBatteriesPageViewProps} />;
};

export default AddBatteriesPage;
