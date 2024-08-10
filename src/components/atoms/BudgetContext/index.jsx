import React, { createContext, useContext, useState, useEffect } from "react";

const BudgetContext = createContext();

export const useBudget = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
  const parseLocalStorage = (key) => {
    const saved = localStorage.getItem(key);
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  };

  const [totalBudget, setTotalBudget] = useState(() => {
    const savedTotalBudget = localStorage.getItem("totalBudget");
    return savedTotalBudget ? parseFloat(savedTotalBudget) : 0;
  });

  const [semenLantaiEstimate, setSemenLantaiEstimate] = useState(() => {
    const saved = parseLocalStorage("semenLantaiEstimateHistory");
    return {
      cost: saved.reduce((acc, item) => acc + parseFloat(item.price), 0),
      history: saved,
    };
  });

  const [lantaiEstimate, setLantaiEstimate] = useState(() => {
    const saved = parseLocalStorage("lantaiEstimateHistory");
    return {
      cost: saved.reduce((acc, item) => acc + parseFloat(item.price), 0),
      history: saved,
    };
  });

  const [pondasiEstimate, setPondasiEstimate] = useState(() => {
    const saved = parseLocalStorage("pondasiEstimateHistory");
    return {
      cost: saved.reduce((acc, item) => acc + parseFloat(item.price), 0),
      history: saved,
    };
  });

  const [dindingEstimate, setDindingEstimate] = useState(() => {
    const saved = parseLocalStorage("dindingEstimateHistory");
    return {
      cost: saved.reduce((acc, item) => acc + parseFloat(item.price), 0),
      history: saved,
    };
  });

  const [catEstimate, setCatEstimate] = useState(() => {
    const saved = parseLocalStorage("catEstimateHistory");
    return {
      cost: saved.reduce((acc, item) => acc + parseFloat(item.price), 0),
      history: saved,
      color: "",
    };
  });

  // Save estimates and total budget to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("totalBudget", totalBudget.toString());
    localStorage.setItem(
      "semenLantaiEstimateHistory",
      JSON.stringify(semenLantaiEstimate.history)
    );
    localStorage.setItem(
      "lantaiEstimateHistory",
      JSON.stringify(lantaiEstimate.history)
    );
    localStorage.setItem(
      "pondasiEstimateHistory",
      JSON.stringify(pondasiEstimate.history)
    );
    localStorage.setItem(
      "dindingEstimateHistory",
      JSON.stringify(dindingEstimate.history)
    );
    localStorage.setItem(
      "catEstimateHistory",
      JSON.stringify(catEstimate.history)
    );
  }, [
    totalBudget,
    semenLantaiEstimate,
    lantaiEstimate,
    pondasiEstimate,
    dindingEstimate,
    catEstimate,
  ]);

  useEffect(() => {
    const newTotal =
      semenLantaiEstimate.cost +
      lantaiEstimate.cost +
      pondasiEstimate.cost +
      dindingEstimate.cost +
      catEstimate.cost;
    setTotalBudget(newTotal);
  }, [
    semenLantaiEstimate,
    lantaiEstimate,
    pondasiEstimate,
    dindingEstimate,
    catEstimate,
  ]);

  const addSemenLantaiEstimate = (newEstimate) => {
    const newPrice = parseFloat(newEstimate.price);
    if (isNaN(newPrice)) {
      console.error("Invalid price:", newEstimate.price);
      return;
    }
    setSemenLantaiEstimate((prevEstimate) => ({
      cost: prevEstimate.cost + newPrice,
      history: [
        ...(prevEstimate.history || []),
        { ...newEstimate, price: newPrice },
      ],
    }));
  };

  const removeSemenLantaiEstimate = (index) => {
    setSemenLantaiEstimate((prevEstimate) => {
      const newHistory = (prevEstimate.history || []).filter(
        (_, i) => i !== index
      );
      const removedCost = parseFloat(prevEstimate.history[index].price);
      if (isNaN(removedCost)) {
        console.error("Invalid price:", prevEstimate.history[index].price);
        return prevEstimate;
      }
      const newCost = newHistory.reduce(
        (acc, curr) => acc + parseFloat(curr.price),
        0
      );
      setTotalBudget((prevTotal) => prevTotal - removedCost);
      return {
        ...prevEstimate,
        cost: newCost,
        history: newHistory,
      };
    });
  };

  const addLantaiEstimate = (newEstimate) => {
    const newPrice = parseFloat(newEstimate.price);
    if (isNaN(newPrice)) {
      console.error("Invalid price:", newEstimate.price);
      return;
    }
    setLantaiEstimate((prevEstimate) => ({
      cost: prevEstimate.cost + newPrice,
      history: [
        ...(prevEstimate.history || []),
        { ...newEstimate, price: newPrice },
      ],
    }));
  };

  const removeLantaiEstimate = (index) => {
    setLantaiEstimate((prevEstimate) => {
      const newHistory = (prevEstimate.history || []).filter(
        (_, i) => i !== index
      );
      const removedCost = parseFloat(prevEstimate.history[index].price);
      if (isNaN(removedCost)) {
        console.error("Invalid price:", prevEstimate.history[index].price);
        return prevEstimate;
      }
      const newCost = newHistory.reduce(
        (acc, curr) => acc + parseFloat(curr.price),
        0
      );
      setTotalBudget((prevTotal) => prevTotal - removedCost);
      return {
        ...prevEstimate,
        cost: newCost,
        history: newHistory,
      };
    });
  };

  const addPondasiEstimate = (newEstimate) => {
    const newPrice = parseFloat(newEstimate.price);
    if (isNaN(newPrice)) {
      console.error("Invalid price:", newEstimate.price);
      return;
    }
    setPondasiEstimate((prevEstimate) => ({
      cost: prevEstimate.cost + newPrice,
      history: [
        ...(prevEstimate.history || []),
        { ...newEstimate, price: newPrice },
      ],
    }));
  };

  const removePondasiEstimate = (index) => {
    setPondasiEstimate((prevEstimate) => {
      const newHistory = (prevEstimate.history || []).filter(
        (_, i) => i !== index
      );
      const removedCost = parseFloat(prevEstimate.history[index].price);
      if (isNaN(removedCost)) {
        console.error("Invalid price:", prevEstimate.history[index].price);
        return prevEstimate;
      }
      const newCost = newHistory.reduce(
        (acc, curr) => acc + parseFloat(curr.price),
        0
      );
      setTotalBudget((prevTotal) => prevTotal - removedCost);
      return {
        ...prevEstimate,
        cost: newCost,
        history: newHistory,
      };
    });
  };

  const addDindingEstimate = (newEstimate) => {
    const newPrice = parseFloat(newEstimate.price);
    if (isNaN(newPrice)) {
      console.error("Invalid price:", newEstimate.price);
      return;
    }
    setDindingEstimate((prevEstimate) => ({
      cost: prevEstimate.cost + newPrice,
      history: [
        ...(prevEstimate.history || []),
        { ...newEstimate, price: newPrice },
      ],
    }));
  };

  const removeDindingEstimate = (index) => {
    setDindingEstimate((prevEstimate) => {
      const newHistory = (prevEstimate.history || []).filter((_, i) => i !== index);
      if (!prevEstimate.history[index]) {
        console.error("Invalid index:", index);
        return prevEstimate;
      }
      const removedCost = parseFloat(prevEstimate.history[index].price);
      if (isNaN(removedCost)) {
        console.error("Invalid price:", prevEstimate.history[index].price);
        return prevEstimate;
      }
      const newCost = newHistory.reduce(
        (acc, curr) => acc + parseFloat(curr.price),
        0
      );
      setTotalBudget((prevTotal) => prevTotal - removedCost);
      return {
        ...prevEstimate,
        cost: newCost,
        history: newHistory,
      };
    });
  };

  const addCatEstimate = (newEstimate) => {
    const newPrice = parseFloat(newEstimate.price);
    if (isNaN(newPrice)) {
      console.error("Invalid price:", newEstimate.price);
      return;
    }
    setCatEstimate((prevEstimate) => ({
      cost: prevEstimate.cost + newPrice,
      history: [
        ...(prevEstimate.history || []),
        { ...newEstimate, price: newPrice },
      ],
    }));
  };

  const removeCatEstimate = (index) => {
    setCatEstimate((prevEstimate) => {
      const newHistory = (prevEstimate.history || []).filter(
        (_, i) => i !== index
      );
      const removedCost = parseFloat(prevEstimate.history[index].price);
      if (isNaN(removedCost)) {
        console.error("Invalid price:", prevEstimate.history[index].price);
        return prevEstimate;
      }
      const newCost = newHistory.reduce(
        (acc, curr) => acc + parseFloat(curr.price),
        0
      );
      setTotalBudget((prevTotal) => prevTotal - removedCost);
      return {
        ...prevEstimate,
        cost: newCost,
        history: newHistory,
      };
    });
  };

  const clearAllEstimates = () => {
    setSemenLantaiEstimate({ cost: 0, history: [] });
    setLantaiEstimate({ cost: 0, history: [] });
    setPondasiEstimate({ cost: 0, history: [] });
    setDindingEstimate({ cost: 0, history: [] });
    setCatEstimate({ cost: 0, color: "", history: [] });
    setTotalBudget(0);
    localStorage.removeItem("semenLantaiEstimateHistory");
    localStorage.removeItem("lantaiEstimateHistory");
    localStorage.removeItem("pondasiEstimateHistory");
    localStorage.removeItem("dindingEstimateHistory");
    localStorage.removeItem("catEstimateHistory");
    localStorage.removeItem("totalBudget");
  };

  return (
    <BudgetContext.Provider
      value={{
        totalBudget,
        setTotalBudget,
        semenLantaiEstimate,
        addSemenLantaiEstimate,
        removeSemenLantaiEstimate,
        lantaiEstimate,
        addLantaiEstimate,
        removeLantaiEstimate,
        pondasiEstimate,
        addPondasiEstimate,
        removePondasiEstimate,
        dindingEstimate,
        addDindingEstimate,
        removeDindingEstimate,
        catEstimate,
        addCatEstimate,
        removeCatEstimate,
        clearAllEstimates,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
