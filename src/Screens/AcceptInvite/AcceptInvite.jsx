import React from "react";
import { acceptInvite } from "../../actions";

import { useDispatch } from "react-redux";
import "./AcceptInvite.scss";
const AcceptInvite = (props) => {
  const dispatch = useDispatch();
  console.log(props.match.params.id);

  const handleInvite = () => {
    const id = props.match.params.id;
    const data = {
      hash: id,
    };
    dispatch(acceptInvite(data));
  };
  return (
    <div id="invite">
      <div className="container d-flex align-items-center justify-content-center">
        <div className="cookiesContent" id="cookiesPopup">
          <img src="/images/favicon.png" alt="logo" />
          <p>
            By accepting you will be add to close cause and then you have to
            sign in to Virtu for experience
          </p>
          <button className="accept" onClick={handleInvite}>
            Accept Invite
          </button>
        </div>
      </div>
    </div>
  );
};
export default AcceptInvite;
