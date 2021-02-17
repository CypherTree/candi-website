export const getTenantInfo = () => {
  console.log("loc -->", window.location.href); //yields: "https://stacksnippets.net/js"

  const location = window.location.href;

  console.log("loc1 -->", location);

  const result = location.split(".");

  console.log("loc2 -->", result);

  const first = result.shift();

  console.log("loc3 -->", first);

  const tenent = first?.split("://");

  console.log("loc4 -->", tenent);

  const last = tenent?.pop();

  console.log("loc5 -->", last);

  console.log("----> the tenant recieved is ----> ", last);

  return last;
};
