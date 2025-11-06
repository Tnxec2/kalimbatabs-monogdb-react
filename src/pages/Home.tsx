import { useMemo } from "react";
import { useEffect, useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import KTabCard from "../components/KTabCard";
import Loading from "../components/Loading";
import { Pagination } from "../components/pagination/pagination";
import { KTab } from "../models/KTab";
import { Sort } from "./Sort";
import { useAuth } from "../context/AuthContext";
import { Config } from "../config/Config";
import { useRestApi } from "../context/RestApiContext";
import { FindSong } from "../components/findsong/findsong";
import SongEditDialog from "../components/editsong/editsong";


const START_PAGE = 1;

function Home() {
  const { token } = useAuth();
  const { getKTabs } = useRestApi();

  const [kTabs, setKtabs] = useState<KTab[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);
  

  const [params, setParams] = useState({
    page: START_PAGE,
    size: Config.pageSize,
    searchText: "",
    sortBy: Config.defaultSortField,
    reload: false
  });
  const [total, setTotal] = useState(0);
  
  
  const readOnly = useMemo(() => !token, [token]);

  useEffect(() => {
      getKTabs({
        page: params.page,
        size: Config.pageSize,
        searchText: params.searchText,
        sortBy: params.sortBy,
      })
        .then((result) => { 
          setKtabs(result.result);
          setTotal(result.total);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
  
  }, [params, getKTabs]);


  const handleSearch = (t: string) => {
    setParams((o) => { return { ...o, searchText: t, page: START_PAGE }});
  
  };

  return (
    <Container>
      <FindSong onSearch={handleSearch} />
      {loading && (
        <div className="text-center">
          <Loading />
        </div>
      )}

      <Container className="d-flex justify-content-between mt-3">
        <div>Total: {total}</div>
        <div className="d-flex">
          <Sort sortField={params.sortBy} setSortField={ (f)=> setParams((o) => { return { ...o, sortBy: f, page: START_PAGE }})} />
          {!readOnly ? (
            <Button
              size="sm"
              className="ms-3"
              variant="outline-dark"
              onClick={() => setOpenAddModal(true)}
            >
              Add song
            </Button>
          ) : (
            ""
          )}
        </div>
      </Container>

      <ListGroup as="ul" className="mt-3 mb-3">
        {kTabs.map((ktab) => (
          <KTabCard
            key={ktab._id}
            ktab={ktab}
            readOnly={readOnly}
            onReload={() => setParams((o) => { return { ...o, reload: !o.reload, page: START_PAGE }})}
          />
        ))}
      </ListGroup>
      <Pagination
        currentPage={params.page}
        total={total}
        countPerPage={Config.pageSize}
        onChangePage={(p) => setParams((o) => { return { ...o, page: p }})}
      />

      {openAddModal && (
        <SongEditDialog
          titleDialog="Add new Kalimba Tab"
          onClose={(r) => {
            setOpenAddModal(false);
            if (r) setParams((o) => { return { ...o, reload: !o.reload, page: START_PAGE }});
          }}
          open={openAddModal}
        />
      )}
    </Container>
  );
}

export default Home;
