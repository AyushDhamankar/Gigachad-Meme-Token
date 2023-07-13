import { useState, useEffect } from "react";
function Vote({ state }) {
  const [detail, setDetail] = useState("");
  useEffect(() => {
    const { contract } = state;
    const getDetail = async () => {
      const nameText = await contract.methods.getProposal().call();
      setDetail(nameText);
    };
    contract && getDetail();
  }, [state]);

  const vote = async (id) => {
    try {
      console.log("Hii");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const { contract } = state;

      await contract.methods
        .vote(id)
        .send({ from: accounts[0] });
    } catch (error) {
      console.error(error);
      console.log("Bye");
    }
  };

  const [res, setRes] = useState("");
  const result = async (id) => {
    try {
      console.log("Hii");
      const { contract } = state;

      const res1 = await contract.methods
        .proposalResult(id)
        .call();
        setRes(res1);
        console.log(res1);
    } catch (error) {
      console.error(error);
      console.log("Bye");
    }
  };

  const styles = {
    display: "flex",
    alignItems: "center",
    minHeight: "90vh",
  };
  return (
    <>
      <section class="text-gray-400 bg-gray-900 body-font" style={styles}>
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {detail !== "" &&
              detail.map((detail) => {
                console.log(detail);
                return (
                  <div class="p-4 lg:w-1/3">
                    <div class="h-full bg-gray-800 bg-opacity-40 px-8 py-16 rounded-lg overflow-hidden text-center relative">
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                        Title : {detail[1]}
                      </h1>
                      <p class="leading-relaxed mb-3">Description : {detail[2]}</p>
                      <button class="inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 mr-5" onClick={()=>{vote(Number(detail[0]))}}>
                        Vote
                      </button>
                      <button class="inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0" onClick={()=>{result(Number(detail[0]))}}>
                        Result
                      </button>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mt-3">
                        { res === "true" ? "Proposal Approved" : res === "" ? "" : "Proposal Decline" }
                      </h1>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Vote;
