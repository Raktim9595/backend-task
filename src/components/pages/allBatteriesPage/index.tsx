import { useAllBatteries } from "./useAllBatteries";
import BatteriesListView from "./BatteriesListView";

export const AllBatteriesPage = () => {
	const batteriesListProps = useAllBatteries();

	return <BatteriesListView {...batteriesListProps} />;
};
