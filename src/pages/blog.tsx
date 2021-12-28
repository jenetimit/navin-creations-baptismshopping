import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Button from "@components/ui/button";
import Navbar from "@components/layout/navbar/navbar";
import ErrorMessage from "@components/ui/error-message";
import renderProductCard from "@components/product/render-product-card";
import NotFound from "@components/common/not-found";
import { useProductsQuery } from "@data/product/use-products.query";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import Footer from "@components/common/footer";
import Image from 'next/image';
import Card from "@components/ui/card";



const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
);

const SideBar = dynamic(
  () => import("@components/ui/sidebar-menu")
);

const Feed = () => {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  const {
    isFetching: loading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    isError,
    data,
    error,
  } = useProductsQuery({
    type: query.type as string,
    text: query?.text as string,
    category: query?.category as string,
  });

  if (isError && error) return <ErrorMessage message={error.message} />;
  function handleLoadMore() {
    fetchNextPage();
  }
  if (!loading && !data?.pages?.[0]?.data?.length) {
    return (
      <div className="bg-gray-100 min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }
  return (
    <>
     <Navbar />
    {/* sidebar */}

    <div className="w-full bg-light-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
        
        {/* Contact form */}
        <div className="w-full order-1 md:order-2 mb-8 md:mb-0 md:ms-7 lg:ms-9 p-5 md:p-8 bg-light">
          {/* <h1 className="mb-7 text-xl md:text-2xl font-body font-bold text-heading">
           
          </h1> */}

            {/* <img
              src="/logo1.png"
              alt={t("nav-menu-contact")}
              className="w-full h-auto"
            /> */}
            
            
            <section className="py-8 px-4 lg:py-10 lg7px-8 xl:py-14 xl:px-16 2xl:px-20 text-center mb-8">
                   <h1>Decoration</h1>
                   <p className="py-4 mt-2 text-2xl text-extrabold"><strong>Baptism Decoration For Baby Boy</strong></p>
                   <p className="py-4 mt-2 text-xl text-extrabold">You are planning for your baby boys christening/baptism? here in this blog i will show you some ideas for baptism decoration for boys.</p>
                   <div style={{alignSelf: 'center'}}>
                        <img 
                        src="/rosary.jpg"
                        alt="baby"
                        />
                    </div>
                    <p className="py-4 mt-2 text-xl text-extrabold">This is why baptism so special to Christians Being baptised is in some ways like a special welcome into a local church. Baptism is a sign that someone has turned from (‘repented of’) living to please themselves and instead has chosen to live God’s way. Some Christian churches baptise infants. Others wait until a person […]</p>
                    <a className=" mt-16 p-2" style={{backgroundColor: '#fff',color: '#fc0388',borderWidth: 1,borderColor:'#fc0388',marginTop: 10}}>Continue Reading</a>
            </section>
           
          
      

          
        </div>
      </div>
    </div>

    <Footer />
        
    </>
  );
};

export default Feed;
