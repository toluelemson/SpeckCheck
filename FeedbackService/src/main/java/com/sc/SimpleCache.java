package com.sc;

import java.util.HashMap;
import java.util.Map;

public class SimpleCache<K, V> {
    private Map<K, V> cache;
    private int maxSize;

    public SimpleCache(int maxSize) {
        if (maxSize <= 0) {
            throw new IllegalArgumentException("Cache size must be a positive integer.");
        }
        this.cache = new HashMap<>();
        this.maxSize = maxSize;
    }

    public synchronized void put(K key, V value) {
        if (cache.size() >= maxSize) {
            // Handle cache eviction if necessary (e.g., remove the least recently used entry)
            // For simplicity, we'll just clear the cache here, but you may implement a proper eviction policy.
            cache.clear();
        }
        cache.put(key, value);
    }

    public synchronized V get(K key) {
        return cache.get(key);
    }

    public synchronized boolean containsKey(K key) {
        return cache.containsKey(key);
    }

    public synchronized boolean isEmpty() {
        return cache.isEmpty();
    }

    public synchronized int size() {
        return cache.size();
    }

    public synchronized void clear() {
        cache.clear();
    }
}
