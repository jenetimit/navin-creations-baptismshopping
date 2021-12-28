import Search from "@components/common/search";
import { useUI } from "@contexts/ui.context";
import { BannerType } from "@settings/site-pages.settings";
import Image from "next/image";
import { Waypoint } from "react-waypoint";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import  NewFeatureProducts  from "../newlyArrived";

type BannerProps = {
  banner: BannerType;
  className?: string;
};
const Banner: React.FC<BannerProps> = ({ banner, className }) => {
  const { t } = useTranslation("banner");
  const { showHeaderSearch, hideHeaderSearch } = useUI();
  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
      showHeaderSearch();
    }
  };
  return (
    <>
    <div className={cn("hidden lg:block relative", className)}>
      <div className="min-h-140 overflow-hidden -z-1">
        <Image
          alt={banner?.heading}
          src={banner?.image ?? "/banner/grocery.png"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-5 mt-24 absolute inset-0 w-full flex flex-col items-center justify-center text-center" style={{marginTop:'20em'}}>
        <h1 className="text-4xl xl:text-5xl tracking-tight mb-5 xl:mb-5" style={{color:'white'}}>
          {/* {t(banner?.heading)} */}  BAPTISM CLOTHING
        </h1> 
        {/* <p className="text-base xl:text-lg text-heading mb-10 xl:mb-14">
          {t(banner?.subheading)}
        </p> */}
        <div className="max-w-3xl w-full xl:mb-1">
          <Search label="search" />
        </div>
        <p className="p-5 mt-8 text-base xl:text-lg text-heading" style={{color:'white'}}>
          {/* {t(banner?.subheading)} */}And the Holy Spirit on him in a bodily form like a dove. And a voice came from heaven:
        </p>
        <p className=" text-base xl:text-lg text-heading" style={{color:'white'}}>
          {/* {t(banner?.subheading)} */}
          "You are my son,whom i love; with you i'm well pleased."
        </p>
        <p className=" text-base xl:text-lg text-heading xl:mb-2" style={{color:'white'}}>
          {/* {t(banner?.subheading)} */}Luke 3:22
        </p>
        <p className=" text-base xl:text-lg text-heading xl:mb-2">
          {/* {t(banner?.subheading)} */}
        </p>
        <Waypoint
          onLeave={showHeaderSearch}
          onEnter={hideHeaderSearch}
          onPositionChange={onWaypointPositionChange}
        />
      </div>
    </div>

    <NewFeatureProducts/> 
    
    </>
  );
};

export default Banner;
