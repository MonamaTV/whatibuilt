import Head from "next/head";
import React from "react";

const Meta = () => {
  return (
    <Head>
      <title>
        WhatIBuilt - You can create a dev portfolio with so much ease. Put all
        your content from different platforms in one place
      </title>
      <meta
        name="description"
        content="You can create a dev portfolio with so much ease. Put all your content from different platforms in one place"
      />

      <meta property="og:url" content="https://whatibuild.vercel.app" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="WhatIBuilt - You can create a dev portfolio with so much ease. Put all your content from different platforms in one place"
      />
      <meta
        property="og:description"
        content="You can create a dev portfolio with so much ease. Put all your content from different platforms in one place"
      />
      {/* <meta property="og:image" content="./public/icon-512x512.png" /> */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="https://whatibuilt.vercel.app" />
      <meta property="twitter:url" content="https://whatibuilt.vercel.app" />
      <meta
        name="twitter:title"
        content="WhatIBuilt - You can create a dev portfolio with so much ease. Put all your content from different platforms in one place"
      />
      <meta
        name="twitter:description"
        content="You can create a dev portfolio with so much ease. Put all your content from different platforms in one place"
      />
      <meta name="twitter:image" content="./public/icon-512x512.png" />
    </Head>
  );
};

export default Meta;
