"use client";

import { useQuery } from '@tanstack/react-query';
import {
  fetchTradingPairs,
  fetchTradingPair,
  fetchConverters,
  fetchConverter,
  fetchVerusSupply,
  fetchMarketStats,
} from './api';

/**
 * Hook to fetch all trading pairs
 */
export function useTradingPairs() {
  return useQuery({
    queryKey: ['trading-pairs'],
    queryFn: fetchTradingPairs,
  });
}

/**
 * Hook to fetch a specific trading pair
 */
export function useTradingPair(tickerId: string) {
  return useQuery({
    queryKey: ['trading-pair', tickerId],
    queryFn: () => fetchTradingPair(tickerId),
    enabled: !!tickerId,
  });
}

/**
 * Hook to fetch all converters
 */
export function useConverters() {
  return useQuery({
    queryKey: ['converters'],
    queryFn: fetchConverters,
  });
}

/**
 * Hook to fetch a specific converter
 */
export function useConverter(name: string) {
  return useQuery({
    queryKey: ['converter', name],
    queryFn: () => fetchConverter(name),
    enabled: !!name,
  });
}

/**
 * Hook to fetch VRSC supply
 */
export function useVerusSupply() {
  return useQuery({
    queryKey: ['verus-supply'],
    queryFn: fetchVerusSupply,
  });
}

/**
 * Hook to fetch market statistics
 */
export function useMarketStats() {
  return useQuery({
    queryKey: ['market-stats'],
    queryFn: fetchMarketStats,
  });
}
