import React from "react";
import { Nav } from "react-bootstrap";

const Navigation = () => {
  const pathname = window.location.pathname;
  return (
    <Nav className="justify-content-center mb-4 mt-4 mynav" activeKey="/home">
      <Nav.Item className="menuItemContainer">
        <Nav.Link href="/ehlel" className="">
          <div className={pathname === "/ehlel" ? "menuIconContainer active" : "menuIconContainer"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>Эхлэл</div>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="menuItemContainer">
        <Nav.Link href="/ajilchid" className="">
          <div className={pathname === "/ajilchid" ? "menuIconContainer active" : "menuIconContainer"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>Ажилчид</div>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="menuItemContainer">
        <Nav.Link href="/haih" className="">
          <div className={pathname === "/haih" ? "menuIconContainer active" : "menuIconContainer"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>Хайх</div>
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item className="menuItemContainer">
        <Nav.Link href="/archive" className="">
          <div className={pathname === "/archive" ? "menuIconContainer active" : "menuIconContainer"}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>Архив</div>
        </Nav.Link>
      </Nav.Item> */}
    </Nav>
  );
};

export default Navigation;