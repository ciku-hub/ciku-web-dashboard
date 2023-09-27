import React from 'react'

import { Col, Row } from 'antd'
import { ArrowCircleRight } from 'iconsax-react'

import MenuLogo from '../../../layout/components/menu/logo'

export default function Header() {
    return (
        <Row align="middle" justify="space-between" className="hp-px-sm-16 hp-px-64 hp-py-16 hp-mb-48 hp-border-bottom-1 hp-border-color-dark-70">
            <Col>
                <MenuLogo />
            </Col>

            <Col>
                <Row align="middle">
                    <a href="https://ciku.co" className="hp-d-flex-center">
                        <ArrowCircleRight
                            size="24"
                            variant="Bold"
                            className="hp-text-color-black-100 hp-text-color-dark-0"
                        />
                        <span className="hp-ml-6 hp-d-block hp-p1-body hp-text-color-black-100 hp-text-color-dark-0">Go to Website</span>
                    </a>
                </Row>
            </Col>
        </Row>
    )
}
