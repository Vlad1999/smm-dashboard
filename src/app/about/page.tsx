'use client'

import withAuth from "@/lib/withAuth";

function About() {

  return (
    <div>
        This is about page
    </div>
  );
}

export default withAuth(About);