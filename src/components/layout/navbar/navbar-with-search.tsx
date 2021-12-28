import { useRef } from "react";
import Link from "@components/ui/link";
import cn from "classnames";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import Logo from "@components/ui/logo";
import Search from "@components/common/search";
import JoinButton from "@components/layout/navbar/join-button";
import ProductTypeMenu from "@components/layout/navbar/product-type-menu";
import dynamic from "next/dynamic";
import { ROUTES } from "@utils/routes";
import { useTypesQuery } from "@data/type/use-types.query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ReadingTable } from "@components/icons/category";

const AuthorizedMenu = dynamic(
  () => import("@components/layout/navbar/authorized-menu"),
  { ssr: false }
);

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const NavbarWithSearch = () => {
  const { t } = useTranslation("common");
  const { asPath } = useRouter();
  const { data } = useTypesQuery();

  const slugs = data?.types?.map((item) => item.slug);
  const currentPath = asPath
    .substring(
      0,
      asPath.indexOf("?") === -1 ? asPath.length : asPath.indexOf("?")
    )
    .replace(/\//g, "");

  const hasType = slugs?.includes(currentPath);

  const navbarRef = useRef() as DivElementRef;
  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  return (
    <header
      ref={navbarRef}
      className="site-header-with-search h-14 md:h-16 lg:h-auto"
    >
    
      <nav
      style={{backgroundColor:"#000"}}
        className={cn(
          "w-full h-14 md:h-16 lg:h-22 py-5 px-4 lg:px-8 flex justify-between items-center  top-0 end-0 z-20 transition-transform duration-300",
          {
            "fixed bg-light lg:bg-transparent lg:absolute":
              !displayHeaderSearch && hasType,
            "is-sticky fixed bg-light shadow-sm":
              displayHeaderSearch || !hasType,
          }
        )}
      >
        {displayMobileSearch ? (
          <div className="w-full">
            <Search label={t("text-search-label")} variant="minimal" />
          </div>
        ) : (
          <>
            <Logo className="mx-auto lg:mx-0 opacity-100" />
            {/* <p className="text-head">hihello</p> */}
            <ProductTypeMenu className="ms-10 me-auto hidden xl:block" />
            <div className="justify-content-center flex items-center" style={{position:'absolute',left:'29%'}}>
              <ul className="hidden lg:flex items-center flex-shrink-10 space-s-9" style={{opacity: 1}}>
                {isAuthorize ? (
                  <li key="track-orders">
                    <Link
                      href={ROUTES.ORDERS}
                      className="font-extrabold color-border-50 justify-content-center flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                    >
                      {t("nav-menu-track-order")}
                    </Link>
                  </li>
                ) : null}
                {siteSettings.headerLinks.map(({ href, label, icon }) => (
                  <li key={`${href}${label}`}>
                   
                    <Link
                      href={href}
                      className="font-semibold text-heading justify-content-center flex items-center transition duration-200 no-underline"
                    >
                      {icon && <span className="me-2">{icon}</span>}
                      {t(label)}
                    </Link>
                   
                  </li>
                ))}
                {/* {isAuthorize ? (
                  <li>
                    <AuthorizedMenu />
                  </li>
                ) : (
                  <li >
                    <JoinButton />
                  </li>
                )} */}
              </ul>
            </div>
            <div className="hidden lg:block w-full items-end	">
              <div
                className={cn(
                  "mr-2 xl:w-5/12 2xl:w-5/12 mx-auto  overflow-hidden items-end	 ",
                  {
                    hidden: !displayHeaderSearch && hasType,
                    flex: displayHeaderSearch || !hasType,
                  }
                )}
              >
                <Search className="items-end	" label={t("text-search-label")} variant="minimal" />
              </div>
            </div>
           
          </>
        )}
      </nav>
    </header>
  );
};

export default NavbarWithSearch;
