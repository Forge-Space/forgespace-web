import type { NextPageContext } from "next";

function Error(_props: { statusCode?: number }) {
  return null;
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
