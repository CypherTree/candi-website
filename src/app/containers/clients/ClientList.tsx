import { Layout, Typography } from "antd";
import React from "react";
import ClientItem from "./ClientItem";

const { Text } = Typography;

const ClientList = (props: any) => {
  const { setLoading, clientList, setShouldReload, getAllClients } = props;
  return (
    <div>
      {clientList.length > 0 ? (
        clientList.map((client: any) => (
          <ClientItem
            clientData={client}
            setLoading={setLoading}
            setShouldReload={setShouldReload}
            getAllClients={getAllClients}
          />
        ))
      ) : (
        <Layout style={{ paddingTop: "30px" }}>
          <Text style={{ fontSize: "18px" }}>You have no clients.</Text>
        </Layout>
      )}
    </div>
  );
};

export default ClientList;
