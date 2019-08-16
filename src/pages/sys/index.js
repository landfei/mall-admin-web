import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '@/components/advance-route';

function sys({ match, ...rest }) {
  console.log('sys', match, rest)

  return (
    <div>
      <Switch>
        <PrivateRoute path={`${match.path}/menu`} exact component={loadable(() => import('./Menu'))} routeName="菜单管理" />
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default sys;
