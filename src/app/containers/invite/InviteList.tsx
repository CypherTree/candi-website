import React from "react";

import { Layout, Typography } from "antd";

import InviteItem from "./InviteItem";

const { Text } = Typography;

const InviteList = (props: any) => {
  const { setLoading, inviteList, setShouldReload } = props;

  return (
    <div>
      {inviteList.length > 0 ? (
        inviteList.map((invite: any) => (
          <InviteItem
            inviteData={invite}
            setLoading={setLoading}
            setShouldReload={setShouldReload}
          />
        ))
      ) : (
        <Layout style={{ paddingTop: "30px" }}>
          <Text style={{ fontSize: "18px" }}>You have no Pending invites.</Text>
        </Layout>
      )}
    </div>
  );
};

export default InviteList;
