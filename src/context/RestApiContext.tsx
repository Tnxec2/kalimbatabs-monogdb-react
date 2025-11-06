import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { KTab } from '../models/KTab';
import { REACT_APP_KALIMBA_TABS_BACKEND } from '../envinromnet';

export interface KTabsResponse {
  total: number;
  page: number;
  pages: number;
  size: number;
  result: KTab[];
}

export interface GetKTabsParams {
  page?: number;
  size?: number;
  searchText?: string;
  sortBy?: string; // 'title' | 'interpreter' | 'difficulty' | 'updated' | 'difficulty_desc';
}

export type KTabInsert = Omit<KTab, '_id' | 'updated'>;

// Typ für den Kontext-Wert
interface RestApiContextType {
  getKTabs: (params?: GetKTabsParams) => Promise<KTabsResponse>;
  insertKTab: (ktab: KTabInsert, token: string) => Promise<string>;
  updateKTab: (id: string, ktab: KTabInsert, token: string) => Promise<Response>;
  deleteKTab: (id: string, token: string) => Promise<Response>;
  getToken: (username: string, password: string) => Promise<Response>;
}

// Erstellen des Kontexts
const RestApiContext = createContext<RestApiContextType | null>(null);

/**
 * Custom Hook zur Verwendung des RestApiContext.
 * Stellt sicher, dass der Hook innerhalb eines RestApiProvider verwendet wird.
 */
export const useRestApi = () => {
  const context = useContext(RestApiContext);
  if (!context) {
    throw new Error('useRestApi must be used within a RestApiProvider');
  }
  return context;
};

interface RestApiProviderProps {
  children: ReactNode;
  baseUrl?: string;
}

/**
 * Provider-Komponente, die die API-Funktionen bereitstellt.
 */
export const RestApiProvider = ({
  children,
  baseUrl = REACT_APP_KALIMBA_TABS_BACKEND,
}: RestApiProviderProps) => {

    console.log(baseUrl);
    
  const api = useMemo(() => {
    const getKTabs = async (params: GetKTabsParams = {}): Promise<KTabsResponse> => {
      const query = new URLSearchParams();
      if (params.page) query.append('page', String(params.page));
      if (params.size) query.append('size', String(params.size));
      if (params.searchText) query.append('searchText', params.searchText);
      if (params.sortBy) query.append('sortBy', params.sortBy);

      const response = await fetch(`${baseUrl}?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ktabs');
      }
      return response.json();
    };

    const insertKTab = async (ktab: KTabInsert, token: string): Promise<string> => {
      const response = await fetch(`${baseUrl}/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(ktab),
      });
      if (!response.ok) {
        throw new Error('Failed to insert ktab');
      }
      return response.json(); // Gibt die insertedId zurück
    };

    const updateKTab = async (id: string, ktab: KTabInsert, token: string): Promise<Response> => {
      const response = await fetch(`${baseUrl}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(ktab),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ktab with id ${id}`);
      }
      return response;
    };

    const deleteKTab = async (id: string, token: string): Promise<Response> => {
      const response = await fetch(`${baseUrl}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete ktab with id ${id}`);
      }
      return response;
    };

    const getToken = async (username: string, password: string): Promise<Response> => {
        const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      return response.json(); 
    };

    return { getKTabs, insertKTab, updateKTab, deleteKTab, getToken };
  }, [baseUrl]);

  return (
    <RestApiContext.Provider value={api}>
      {children}
    </RestApiContext.Provider>
  );
};
