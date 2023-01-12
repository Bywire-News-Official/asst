import { useMemberstackModal } from "@memberstack/react";

function Login() {
  const { openModal, hideModal } = useMemberstackModal();

  return (
    <div
      onClick={() =>
        openModal({
          type: "LOGIN"
          // planId: "pln_...",
          // priceId: "prc_..."
        }).then(({ data, type }) => {
						console.log('data', data);
			      console.log('type: ', type);
			      hideModal();
					})
		     }
	    >
      Log in
    </div>
  )
}