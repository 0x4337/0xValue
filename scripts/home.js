const formEl = document.querySelector(".form");
const walletValueEl = document.querySelector(".analysis__subTitle");

// https://eth-mainnet.g.alchemy.com/v2/ctfDPWodHrEhTjXsG8hhN8A496B_tXyP/getNFTs/?owner=0xA144F037Dc2Be0CbA3768863D912f89eA6A3CD07

const API_URL =
  "https://eth-mainnet.g.alchemy.com/v2/ctfDPWodHrEhTjXsG8hhN8A496B_tXyP/";
const API_URL_GETNFT = "getNFTs/?owner=";

const API_URL_GET_SALES =
  "getNFTSales?fromBlock=0&toBlock=latest&order=asc&contractAddress=";
const limit = "&limit=10";

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputAddress = event.target.addressInput.value;
  const analysisEl = document.querySelector(".analysis");
  const titleWrapperEl = document.createElement("div");
  titleWrapperEl.classList.add("analysis__title-wrapper");
  analysisEl.appendChild(titleWrapperEl);

  const titleEl = document.createElement("h2");
  titleEl.classList.add("analysis__title");
  titleEl.innerText = "ANALYSIS";
  titleWrapperEl.appendChild(titleEl);

  axios
    .get(API_URL + API_URL_GETNFT + inputAddress)
    .then((response) => {
      console.log(response.data);
      let total = 0;
      const detailsEl = document.querySelector(".details");

      detailsEl.innerHTML = "";
      response.data.ownedNfts.forEach((nft) => {
        if (
          nft.contractMetadata.openSea.floorPrice &&
          nft.contractMetadata.symbol
        ) {
          const detailsCardEl = document.createElement("div");
          detailsCardEl.classList.add("details__card");
          detailsEl.appendChild(detailsCardEl);

          const detailsImgEl = document.createElement("img");
          detailsImgEl.classList.add("details__img");
          detailsImgEl.src = nft.contractMetadata.openSea.imageUrl;
          detailsCardEl.appendChild(detailsImgEl);

          const detailsTitleEl = document.createElement("h3");
          detailsTitleEl.classList.add("details__title");
          detailsCardEl.appendChild(detailsTitleEl);

          const detailsLinkEl = document.createElement("a");
          detailsLinkEl.classList.add("details__link");
          detailsLinkEl.innerHTML = nft.contractMetadata.symbol;
          detailsLinkEl.href = nft.contractMetadata.openSea.externalUrl;
          detailsLinkEl.setAttribute("target", "_blank");
          detailsTitleEl.appendChild(detailsLinkEl);

          const detailsQuantityEl = document.createElement("p");
          detailsQuantityEl.classList.add("details__quantity");
          detailsQuantityEl.innerHTML = `${nft.balance}x`;
          detailsCardEl.appendChild(detailsQuantityEl);

          const detailsFloorEl = document.createElement("p");
          detailsFloorEl.classList.add("details__floor");
          detailsFloorEl.innerHTML = `$${Math.floor(
            nft.contractMetadata.openSea.floorPrice * 1600
          )} USD`;
          // }
          detailsCardEl.appendChild(detailsFloorEl);

          const detailsAvgEl = document.createElement("p");
          detailsAvgEl.classList.add("details__avg");
          detailsAvgEl.innerHTML = nft.contractMetadata.tokenType;
          detailsCardEl.appendChild(detailsAvgEl);

          const detailsTotalEl = document.createElement("p");
          detailsTotalEl.classList.add("details__total");
          total += nft.contractMetadata.openSea.floorPrice * nft.balance;
          detailsTotalEl.innerText =
            nft.contractMetadata.openSea.floorPrice + "Ξ";
          console.log(walletValueEl);

          walletValueEl.innerText = `Value: ${total.toFixed(3)}Ξ ($${
            total.toFixed(2) * 1662
          } USD)`;
          detailsCardEl.appendChild(detailsTotalEl);
        }

        console.log(total);
      });
    })
    .catch((error) => {
      alert("NETWORK ERROR");
    });

  console.log(inputAddress);
});
