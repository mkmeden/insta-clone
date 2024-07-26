import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import { Flex } from "@chakra-ui/react";

const SidebarItems = () => {
	return (
		<>
        <Flex direction={'column'} gap={6}>

			<Home />
			<Search />
			<Notifications />
			<CreatePost />
			<ProfileLink />
        </Flex>
		</>
	);
};

export default SidebarItems;