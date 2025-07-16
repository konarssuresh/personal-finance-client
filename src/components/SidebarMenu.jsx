/* eslint-disable no-unused-vars */
import { useState, useMemo, useEffect } from "react";
import OverviewIcon from "./icons/OverviewIcon";
import TransactionsIcon from "./icons/TransactionsIcon";
import PotsIcon from "./icons/PotsIcon";
import BudgetsIcon from "./icons/BudgetsIcon";
import RecurringBillsIcon from "./icons/RecurringBillsIcon";
import LogoIcon from "./icons/LogoIcon";
import NavbarArrow from "./icons/NavbarArrow";
import clsx from "clsx";

// eslint-disable-next-line no-unused-vars
const NavLink = ({
  IconComponent,
  label,
  hideLabel,
  isMaximized,
  onClick,
  isSelected,
}) => {
  const classes = useMemo(() => {
    const linkClasses = clsx({
      "h-10 mt-2 group w-17 lg:pl-5 lg:w-20 lg:h-14 sm:w-26 flex flex-col lg:flex-row justify-center items-center cursor-pointer": true,
      "lg:justify-start": isMaximized,
      "lg:justify-center": !isMaximized,
      "bg-beige-100 text-grey-900 border-b-green border-b-4 lg:border-b-0 lg:border-l-green lg:border-l-4 rounded-tl-lg rounded-tr-lg lg:rounded-none lg:rounded-tr-lg lg:rounded-br-lg":
        isSelected,
      "lg:w-14": !isMaximized,
      "lg:w-[100%]": isMaximized,
      "hover:text-grey-100": !isSelected,
      "lg:gap-2": true,
    });

    const textClasses = clsx({
      "hidden sm:block text-preset-5 lg:text-preset-3 font-bold": true,
      "transition-all duration-300 ease-in-out": true,
      "transform-gpu will-change-transform": true,
      // Control visibility instead of conditional rendering
      "opacity-100 translate-x-0": !hideLabel,
      "opacity-0 -translate-x-2 pointer-events-none w-0 hidden": hideLabel,
    });

    const iconClasses = clsx({
      "z-10 w-6 h-6 p-0.5 m-auto lg:m-0 fill-grey-300": true,
      "group-hover:fill-grey-100": !isSelected,
      "transition-all duration-300 ease-in-out": true,
    });

    return {
      link: linkClasses,
      icon: iconClasses,
      label: textClasses,
    };
  }, [isMaximized, isSelected, hideLabel]);

  return (
    <a className={classes.link}>
      <IconComponent className={classes.icon} />
      <span className={classes.label}>{label}</span>
    </a>
  );
};

const SidebarMenu = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  // Listen for breakpoint changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleBreakpointChange = (e) => {
      if (e.matches) {
        // Screen is less than 1024px - set isMaximized to true
        setIsMaximized(true);
      } else {
        // Screen is 1024px or larger - set isMaximized to false
        setIsMaximized(false);
      }
    };

    // Set initial state
    handleBreakpointChange(mediaQuery);

    // Add listener
    mediaQuery.addEventListener("change", handleBreakpointChange);

    // Cleanup
    return () =>
      mediaQuery.removeEventListener("change", handleBreakpointChange);
  }, []);

  const classes = useMemo(() => {
    const navWidth = isMaximized ? "lg:w-[18.75rem]" : "lg:w-22";
    return {
      nav: clsx(
        "h-13 lg:h-[100vh]",
        navWidth,
        "px-5 lg:py-6 lg:pl-0  flex flex-row lg:flex-col bg-grey-900 text-grey-300 justify-space-around lg:justify-start items-start",
        "transition-all duration-300 ease-in-out",
        "rounded-tl-lg rounded-tr-lg lg:rounded-none lg:rounded-tr-lg lg:rounded-br-lg"
      ),
      section: clsx(
        "flex flex-row lg:flex-col lg:flex-1 lg:justify-start w-[100%] justify-between items-center lg:items-start gap-2 lg:gap-0 lg:pl-0 lg:pr-0 lg:py-2"
      ),
    };
  }, [isMaximized]);

  return (
    <>
      <nav
        style={{ transform: "translate3d(0, 0, 0)" }}
        className={classes.nav}
      >
        <section className="hidden lg:block p-6">
          <LogoIcon isMaximized={isMaximized} className="" />
        </section>
        <section className={classes.section}>
          <NavLink
            IconComponent={OverviewIcon}
            label="Overview"
            hideLabel={!isMaximized}
            isMaximized
          />
          <NavLink
            IconComponent={TransactionsIcon}
            label="Transactions"
            hideLabel={!isMaximized}
            isMaximized
            isSelected
          />
          <NavLink
            IconComponent={BudgetsIcon}
            label="Budgets"
            hideLabel={!isMaximized}
            isMaximized
          />
          <NavLink
            IconComponent={PotsIcon}
            label="Pots"
            hideLabel={!isMaximized}
            isMaximized
          />
          <NavLink
            IconComponent={RecurringBillsIcon}
            label="Recurring Bills"
            hideLabel={!isMaximized}
            isMaximized
          />
        </section>

        <section className="hidden lg:block">
          <a
            class="px-5 group cursor-pointer flex flex-row gap-2 items-center text-preset-5 font-bold text-grey-300 hover:text-grey-100"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            <NavbarArrow
              isMaximised={isMaximized}
              className="fill-grey-300 group-hover:fill-grey-100"
            />
            {isMaximized && (
              <span className="text-preset-5 font-bold lg:text-preset-3 ">
                Minimize Menu
              </span>
            )}
          </a>
        </section>
      </nav>
    </>
  );
};

export default SidebarMenu;
