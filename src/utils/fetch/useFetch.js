import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import invariant from 'invariant';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import defaultTo from 'lodash/defaultTo';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import memoize from 'lodash/memoize';
import usePrevious from 'utils/usePrevious';
import {
  GET_LIST,
  GET_SINGLE,
  CREATE,
  UPDATE,
  DELETE,
} from 'utils/fetch/fetchTypes';

import {
  init as initAction,
  destroy as destroyAction,
  fetch as fetchAction,
  reset as resetAction,
} from 'store/reducers/fetchSlice';
import { makeSelectFetchParamByEntityId } from '../../store/selectors/fetch';

const useFetch = (apiKey, options = {}) => {
  const {
    uniqId = apiKey,
    entityId = null,
    autoFetch = false,
    destroyOnUnmount = true,
    enableReinitialize = false,
    initialOptions = {},
    prepareParams = noop,
  } = options;

  const prevOptions = usePrevious({ ...initialOptions, apiKey, uniqId });
  const dispatch = useDispatch();
  const page = makeSelectFetchParamByEntityId(uniqId, 'page');
  const size = makeSelectFetchParamByEntityId(uniqId, 'size');
  const filter = makeSelectFetchParamByEntityId(uniqId, 'filter');
  const sort = makeSelectFetchParamByEntityId(uniqId, 'sort');

  const loading = useSelector((state) =>
    get(state, `fetch.${uniqId}.loading`, []),
  );
  const data = useSelector((state) =>
    get(state, `fetch.${uniqId}.dataSource`, null),
  );
  const total = useSelector((state) => get(state, `fetch.${uniqId}.total`, []));
  const error = makeSelectFetchParamByEntityId(uniqId, 'error');

  invariant(!isEmpty(apiKey), 'useFetch: apiKey is required');

  const fetch = useCallback(
    (params, meta) => {
      dispatch(fetchAction({ uniqId, params, meta }));
    },
    [uniqId],
  );

  const loadMore = useCallback(
    (params) => {
      fetch({ limit: params }, { fetchType: GET_LIST });
    },
    [fetch],
  );

  // const nextPage = useCallback(() => {
  //   fetch(
  //     { ...params, limit: limit + 2 },
  //     {
  //       ...meta,
  //     },
  //   );
  // }, [page, fetch]);

  const prevPage = useCallback(() => {
    fetch({ page: page - 1 });
  }, [page, fetch]);

  const changePage = useCallback(
    (nextPage) => {
      fetch({ page: nextPage });
    },
    [fetch],
  );

  const changeSize = useCallback(
    (nextSize) => {
      fetch({ size: nextSize });
    },
    [fetch],
  );

  const reset = useCallback(() => {
    dispatch(resetAction(uniqId));
  }, [uniqId]);

  const getData = useCallback(
    (params) => {
      fetch(params, {
        fetchType: entityId ? GET_SINGLE : GET_LIST,
        entityId,
      });
    },
    [entityId],
  );

  const postData = useCallback((params, meta) => {
    fetch(params, {
      fetchType: CREATE,
      sync: true,
      onSync: getData,
      ...meta,
    });
  }, []);

  const updateData = useCallback(
    (params, meta) => {
      fetch(params, {
        fetchType: UPDATE,
        entityId,
        sync: true,
        onSync: getData,
        ...meta,
      });
    },
    [entityId],
  );

  const deleteData = useCallback(
    (params, meta) => {
      fetch(params, {
        fetchType: DELETE,
        entityId,
        sync: true,
        onSync: getData,
        ...meta,
      });
    },
    [entityId],
  );

  const reinitIfNeeded = () => {
    const currentOptions = { ...initialOptions, apiKey, uniqId };
    if (!isEqual(prevOptions, currentOptions))
      initAction({ uniqId, apiKey, ...initialOptions });
  };

  useEffect(() => {
    dispatch(initAction({ uniqId, apiKey, ...initialOptions }));
    autoFetch && getData({...initialOptions});
    return () => {
      destroyOnUnmount && destroyAction(uniqId);
    };
  }, []);

  useEffect(() => {
    enableReinitialize && reinitIfNeeded();
  }, [apiKey, uniqId, initialOptions]);

  return {
    getData,
    postData,
    updateData,
    deleteData,
    loadMore,
    // nextPage,
    prevPage,
    changePage,
    changeSize,
    reset,
    loading,
    total,
    page,
    size,
    filter,
    sort,
    data,
  };
};

export default useFetch;
