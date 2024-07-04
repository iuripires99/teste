import "../../App.css";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState, React } from "react";
import axios from "axios";

import notificationicon from "../../images/notification.png";
import Box from "../../components/admin/Box";
import TicketListBox from "../../components/admin/TicketListBox";
import BoxProgress from "../../components/admin/ProgressBox";
import BudgetListBox from "../../components/admin/BudgetListBox";

Chart.register(ArcElement, Tooltip, Legend);

const numRowsToShow = 6;

const AdminDashboard = () => {
  const [waitingTicketsCount, setWaitingTicketsCount] = useState(0);
  const [budgetCounts, setBudgetCounts] = useState({
    labels: ["Pending", "Rejected", "Approved", "Completed"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#FFD56D", "#EB5757", "#00B69B", "#2D9CDB"],
      },
    ],
  });
  const [inactiveLicensesCount, setInactiveLicensesCount] = useState(0);

  useEffect(() => {
    const fetchBudgetCounts = async () => {
      try {
        const responses = await Promise.all([
          axios.get("http://localhost:8080/budget/countByStatus/1"),
          axios.get("http://localhost:8080/budget/countByStatus/2"),
          axios.get("http://localhost:8080/budget/countByStatus/3"),
          axios.get("http://localhost:8080/budget/countByStatus/4"),
        ]);

        const counts = {
          Pending: responses[0].data.count || 0,
          Rejected: responses[1].data.count || 0,
          Approved: responses[2].data.count || 0,
          Completed: responses[3].data.count || 0,
        };

        const updatedData = {
          labels: ["Pending", "Rejected", "Approved", "Completed"],
          datasets: [
            {
              data: [
                counts.Pending,
                counts.Rejected,
                counts.Approved,
                counts.Completed,
              ],
              backgroundColor: ["#FFD56D", "#EB5757", "#00B69B", "#2D9CDB"],
            },
          ],
        };

        console.log("Updated data for Doughnut:", updatedData);

        setBudgetCounts(updatedData);
      } catch (error) {
        console.error("Error fetching budget counts:", error);
      }
    };

    fetchBudgetCounts();
  }, []);

  useEffect(() => {
    const fetchWaitingTicketsCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/ticket/status/4");

        const waitingTickets = response.data.count || 0;

        setWaitingTicketsCount(waitingTickets);
      } catch (error) {
        console.error("Error fetching waiting tickets count:", error);
      }
    };

    fetchWaitingTicketsCount();
  }, []);

  useEffect(() => {
    const fetchInactiveLicensesCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/license/countByStatus/1"
        );
        setInactiveLicensesCount(response.data.count || 0); // Assuming your API response has a 'count' field
      } catch (error) {
        console.error("Error fetching inactive licenses count:", error);
      }
    };

    fetchInactiveLicensesCount();
  }, []);

  const pendingCount = budgetCounts.datasets[0].data[0];

  return (
    <div className="dashboard-content bg-light w-100">
      <h4 className="title mt-2 mb-0 mx-4">Dashboard</h4>
      <div className="container">
        <div className="my-4">
          <div className="d-flex justify-content-between">
            <div className="col mx-1">
              <Box
                title="Waiting tickets"
                number={waitingTicketsCount}
                image={notificationicon}
                evolution="10"
              />
            </div>
            <div className="col mx-1">
              <Box
                title="Pending Budgets"
                number={pendingCount}
                image={notificationicon}
                evolution="10"
              />
            </div>
            <div className="col mx-1">
              <Box
                title="Inactive Licences"
                number={inactiveLicensesCount}
                image={notificationicon}
                evolution="10"
              />
            </div>
            <div className="col mx-1">
              <Box
                title="Active Licences"
                number="20"
                image={notificationicon}
                evolution="10"
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-4">
              <BoxProgress />
            </div>
            <div className="col-8">
              <TicketListBox numRowsToShow={numRowsToShow} />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-4">
              <div className="box-container bg-white col-auto roundbg d-flex shadow pb-3 shadow h-100">
                <div className="col-12">
                  <span className="box-title d-flex justify-content-start pt-3 ps-3 pb-3">
                    <strong>
                      <h4>Budgets</h4>
                    </strong>
                  </span>
                  <div className="px-3">
                    <Doughnut
                      data={budgetCounts}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                      style={{ height: "300px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <BudgetListBox numRowsToShow={numRowsToShow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
