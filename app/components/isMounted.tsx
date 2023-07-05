import React, { useEffect } from "react";

const IsMounted = () => {
  const [mounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(() => true);
  }, []);
  return mounted;
};

export default IsMounted;
