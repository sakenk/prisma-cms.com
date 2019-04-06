import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Connector from '@prisma-cms/front/lib/components/FrontEditor/components/Connector';
import { Typography } from 'material-ui';

class TopicsConnection extends Connector {

  static Name = "TopicsConnection";

  renderPanelView(content) {

    const {
      classes,
      Grid,
      hoveredItem,
      dragTarget,
    } = this.context;

    const isActive = this.isActive();

    const isHovered = hoveredItem instanceof this.constructor && !isActive ? true : false;

    const isDragOvered = dragTarget && dragTarget instanceof this.constructor ? true : false;


    return <Grid
      item
      xs={12}
    >
      <div
        className={[
          classes.panelItem,
          isHovered ? "hovered" : "",
          isDragOvered ? "dragOvered" : "",
        ].join(" ")}
        draggable
        onDragStart={event => this.onDragStart(event)}
        onDragEnd={event => this.onDragEnd(event)}
      >
        Топики
        <Typography
          variant="caption"
        >
          Тот же коннектор, только топики
        </Typography>
      </div>
    </Grid>
  }



  prepareDragItem() {

    let newItem = super.prepareDragItem();

    Object.assign(newItem, {
      query: "resourcesConnection",
      where: {
        type: "Topic",
      },
      "first": 4,
      "orderBy": "createdAt_DESC",
      "components": [
        {
          type: "Filters",
        },
        {
          "type": "ListView",
          "components": [
            {
              "type": "Grid",
              "item": true,
              "xs": 12,
              "components": [
                {
                  type: "Section",
                  "components": [
                    {
                      "type": "Grid",
                      "container": true,
                      "alignItems": "center",
                      "spacing": 8,
                      "components": [
                        {
                          "type": "Grid",
                          "item": true,
                          xs: 12,
                          md: 3,
                          "components": [
                            {
                              "type": "Typography",
                              "text": "Название:",
                              variant: "caption",
                            }
                          ]
                        },
                        {
                          "type": "Grid",
                          "xs": true,
                          "item": true,
                          "components": [
                            {
                              "type": "TopicLink",
                            }
                          ]
                        },
                      ]
                    },
                    {
                      "type": "Grid",
                      "container": true,
                      "alignItems": "center",
                      "spacing": 8,
                      "components": [
                        {
                          "type": "Grid",
                          "item": true,
                          xs: 12,
                          md: 3,
                          "components": [
                            {
                              "type": "Typography",
                              "text": "Дата создания:",
                              variant: "caption",
                            }
                          ]
                        },
                        {
                          "type": "Grid",
                          "xs": true,
                          "item": true,
                          "components": [
                            {
                              "type": "NamedField",
                              "name": "createdAt"
                            }
                          ]
                        },
                      ]
                    },
                    {
                      "type": "Grid",
                      "container": true,
                      "alignItems": "center",
                      "spacing": 8,
                      "components": [
                        {
                          "type": "Grid",
                          "item": true,
                          xs: 12,
                          md: 3,
                          "components": [
                            {
                              "type": "Typography",
                              "text": "Кем написан:",
                              variant: "caption",
                            }
                          ]
                        },
                        {
                          "type": "Grid",
                          "xs": true,
                          "item": true,
                          "components": [
                            {
                              "type": "CreatedBy",
                            }
                          ]
                        },
                      ]
                    },
                  ]
                },
              ],
            }
          ],
        },
        {
          "type": "Pagination"
        },
      ],
      "pagevariable": "topicsPage",
      "filtersname": "topicsFilters",
    });

    return newItem;
  }


}

export default TopicsConnection;