import { useState, useEffect } from "react";
function Transaction({ state }) {
  const [detail, setDetail] = useState("");
  useEffect(() => {
    const { contract } = state;
    const getDetail = async () => {
      const nameText = await contract.methods.getTransactions().call();
      setDetail(nameText);
    };
    contract && getDetail();
  }, [state]);

  const styles = {
    display: "flex",
    alignItems: "center",
    minHeight: "90vh",
  };
  return (
    <>
      <section
        class="text-gray-400 bg-gray-900 body-font overflow-hidden"
        style={styles}
      >
        <div class="container px-5 py-24 mx-auto">
          <div class="-my-8 divide-y-2 divide-gray-800">
            {detail !== "" &&
              detail.map((detail) => {
                console.log(detail);
                return (
                  <div class="py-8 flex flex-wrap md:flex-nowrap">
                    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span class="font-semibold title-font text-white">
                        Value
                      </span>
                      <span class="mt-1 text-gray-500 text-sm">
                        {Number(detail[2])} 
                      </span>
                    </div>
                    <div class="md:flex-grow">
                      <h2 class="text-2xl font-medium text-white title-font mb-2">
                        From : {detail[0]}
                      </h2>
                      <p class="leading-relaxed">To : {detail[1]}</p>
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

export default Transaction;
