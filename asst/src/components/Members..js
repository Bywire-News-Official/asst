import React from "react";
import { useEffect } from "react";
import { MemberstackProvider, useMemberstack } from "@memberstack/react"


const Members = () => {
    const memberstack = useMemberstack();
    const [member, setMember] = React.useState(null);

  React.useEffect(() => {
    memberstack.getCurrentMember().then(({ data: member }) => setMember(member))
  }, []);
    
    if (!member) return <div><p>Not a member</p></div>;
    return <div>Welcome, {member.auth.email}</div>;
}


export default Members;