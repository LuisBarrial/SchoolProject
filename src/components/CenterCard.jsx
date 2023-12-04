// eslint-disable-next-line react/prop-types
const CenterCard = ({isClassNameDark,children}) => {
  return (
    <>
      <div
        className={
          "position-absolute d-block flex-column justify-content-center col-9 col-md-6 col-lg-6 col-xl-4 pt-2  top-50 start-50 z-3 " +
          isClassNameDark
        }
        style={{
          backgroundColor: "#dedede",
          transform: "translate(-50%,-50%)",
          borderRadius: "10px 10px",
        }}
      >
        {children}

      </div>
    </>
  );
};
export default CenterCard;
