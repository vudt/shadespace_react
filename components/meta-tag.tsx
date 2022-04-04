import React from "react";
import Head from "next/head";

interface MetaTagProps {
  title: string,
  description?: string
}

const MetaTag = (props: MetaTagProps) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
    </>
  )
}

MetaTag.defaultProps = {
  title: 'Loading...',
  description: 'Loading'
}

export default MetaTag