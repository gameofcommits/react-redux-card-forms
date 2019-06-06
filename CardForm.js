import React from 'react'
import RenderFields from './RenderFields'
import { Adjust, ArrowBack, Block, Search, Add } from '@material-ui/icons'
import { RegularCard, Button } from '../'
import { history } from '../../utils'
import { GridItem } from '..'
import { Tooltip, withStyles } from '@material-ui/core'
import tableStyle from '../../assets/jss/material-dashboard-react/tableStyle'

class CardFormClasse extends React.PureComponent {
  render() {
    const {
      entityName,
      onSubmit,
      fields,
      subTitle,
      cardTitle,
      modalName,
      modalClose,
      simpleForm,
      btnClearDisabled,
      btnSaveDisabled,
      extraButtons,
      getButtonBack,
      links,
      entity,
      match,
      url,
      reset,
      classes
    } = this.props

    return (
      <form key="0">
        {simpleForm ? (
          [
            <RenderFields fields={fields} key="fields" />,
            <GridItem md={12} center key="buttons">
              {extraButtons && extraButtons}
              <Button title="Limpar Pesquisar" type="reset" size="sm" color="warning" onClick={reset}>
                <Block /> Limpar
              </Button>
              <Button title="Pesquisar" size="sm" color="primary" type="submit" onClick={onSubmit}>
                <Search /> Pesquisar
              </Button>
            </GridItem>
          ]
        ) : (
          <RegularCard
            modalClose={modalClose}
            getButton={
              modalName ? (
                <Button title="Gravar Dados" color="transparent" onClick={onSubmit}>
                  <Adjust /> Gravar
                </Button>
              ) : null
            }
            modalName={modalName}
            cardTitle={entityName ? `Cadastro de ${entityName}` : cardTitle || ''}
            cardSubtitle={subTitle || ''}
            cardHeaderAction={
              links && (
                <GridItem md={12}>
                  {links.map((link, idl) => (
                    <Tooltip
                      title={
                        <span
                          style={{
                            fontSize: 13,
                            lineHeight: 1.5,
                            textTransform: 'uppercase'
                          }}
                        >
                          {link.title ? link.title : `Adicionar ${entity}`}
                        </span>
                      }
                      key={idl}
                    >
                      <Button
                        onClick={link.onClick ? link.onClick : () => history.push(`${match.url || url}/novo`)}
                        size="sm"
                        color={link.color || 'white'}
                        simple
                      >
                        {link.icon && (
                          <link.icon className={classes.iconSmall} style={{ marginRight: 5, marginBottom: 2 }} />
                        )}
                        {!link.icon && <Add className={classes.iconSmall} />}
                        {link.label && link.label}
                      </Button>
                    </Tooltip>
                  ))}
                </GridItem>
              )
            }
            content={<RenderFields fields={fields} />}
            footer={[
              ...(extraButtons ? extraButtons : []),
              !modalName && (
                <Button
                  key="0"
                  title="Retornar a tela anterior"
                  size="sm"
                  color="white"
                  onClick={() => {
                    getButtonBack ? getButtonBack() : modalName ? modalClose(modalName) : history.goBack()
                  }}
                >
                  <ArrowBack /> Voltar
                </Button>
              ),
              <Button
                key="1"
                title="Limpar Dados"
                type="reset"
                size="sm"
                disabled={btnClearDisabled}
                onClick={this.props.reset}
                color="warning"
              >
                <Block /> Limpar
              </Button>,
              <Button
                key="2"
                title="Gravar Dados"
                size="sm"
                disabled={btnSaveDisabled}
                color="primary"
                type="submit"
                onClick={onSubmit}
              >
                <Adjust /> Gravar
              </Button>
            ]}
          />
        )}
      </form>
    )
  }
}
export const CardForm = withStyles(tableStyle)(CardFormClasse)
