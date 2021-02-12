import React, { useEffect, useState } from 'react'
import cls from 'classnames'

import Identicon from '../Identicon'
import { useWalletModalToggle } from 'state/application/hooks'
import { fromWei, getEthBalance, setPrecision, shortenAddress } from '../../helpers/utils'
import farmer from '../../assets/farmer.png'
import styles from './index.module.scss'
import WalletModal from 'components/WalletModal'

interface Props {
  account: string | null
}

const Navbar: React.FC<Props> = ({ account }: Props) => {
  const toggleWalletModal = useWalletModalToggle()
  const [ethBalance, setEthBalance] = useState('')
  useEffect(() => {
    if (account) {
      getEthBalance(account, (balance: string) => {
        console.log(balance)
        setEthBalance(setPrecision(fromWei(balance), 4))
      })
    }
  }, [account])
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0 sextext addressBold"
        href="https://acom.uno/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={farmer} width="30" height="30" className="d-inline-block align-top" alt="" />
        &nbsp; ACOM Yield Farm <sub>1.0.0</sub>
      </a>
      <div className={cls('d-flex', 'mr-3', styles.container)}>
        {account && (
          <>
            {ethBalance} ETH
            <div className={styles['address-hash']}>
              {shortenAddress(account)}
              <Identicon address={account} />
            </div>
          </>
        )}
        {!account && (
          <input
            className={styles['connect-button']}
            type="button"
            value="Connect to a wallet"
            onClick={toggleWalletModal}
          />
        )}
      </div>
      <WalletModal />
    </nav>
  )
}

export default Navbar
