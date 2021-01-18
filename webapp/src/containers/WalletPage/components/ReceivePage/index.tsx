import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button, ButtonGroup } from 'reactstrap';
import { MdArrowBack, MdAdd } from 'react-icons/md';
import PaymentRequestList from './PaymentRequestList';
import { I18n } from 'react-redux-i18n';
import { NavLink as RRNavLink, RouteComponentProps } from 'react-router-dom';
import {
  WALLET_PAGE_PATH,
  WALLET_CREATE_RECEIVE_REQUEST,
} from '../../../../constants';
import Header from '../../../HeaderComponent';
import { getPageTitle } from '../../../../utils/utility';
import { getWalletPathAddress } from '../SendPage';

const ReceivePage: React.FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const urlParams = new URLSearchParams(props.location.search);
  const tokenSymbol = urlParams.get('symbol');
  const tokenHash = urlParams.get('hash');
  const tokenAmount = urlParams.get('amount');
  const tokenAddress = urlParams.get('address');
  const isLPS = urlParams.get('isLPS') == 'true';

  return (
    <div className='main-wrapper'>
      <Helmet>
        <title>
          {getPageTitle(I18n.t('containers.wallet.receivePage.receive'))}
        </title>
      </Helmet>
      <Header>
        <Button
          to={
            tokenSymbol
              ? getWalletPathAddress(
                  WALLET_PAGE_PATH,
                  tokenSymbol,
                  tokenHash || '',
                  tokenAmount || '',
                  tokenAddress || '',
                  isLPS
                )
              : WALLET_PAGE_PATH
          }
          tag={RRNavLink}
          color='link'
          className='header-bar-back'
        >
          <MdArrowBack />
          <span className='d-lg-inline text-uppercase'>
            {I18n.t('containers.wallet.receivePage.backButton')}
          </span>
        </Button>
        <h1>{I18n.t('containers.wallet.receivePage.receive')}</h1>
        <ButtonGroup>
          <Button
            to={WALLET_CREATE_RECEIVE_REQUEST}
            tag={RRNavLink}
            color='link'
          >
            <MdAdd />
            <span className='d-lg-inline'>
              {I18n.t('containers.wallet.receivePage.newAddressButton')}
            </span>
          </Button>
        </ButtonGroup>
      </Header>
      <div className='content'>
        <section>
          <PaymentRequestList />
        </section>
      </div>
    </div>
  );
};

export default ReceivePage;
