package status

import (
	"net/http"

	httperror "github.com/portainer/libhttp/error"
	"github.com/portainer/libhttp/response"
	"github.com/portainer/portainer/api/internal/endpointutils"
	"github.com/portainer/portainer/api/platform"
)

type systemInfoResponse struct {
	Platform    platform.ContainerPlatform `json:"platform"`
	EdgeAgents  int                        `json:"edgeAgents"`
	EdgeDevices int                        `json:"edgeDevices"`
	Agents      int                        `json:"agents"`
}

// @id statusSystem
// @summary Retrieve system info
// @description **Access policy**: authenticated
// @security ApiKeyAuth
// @security jwt
// @tags status
// @produce json
// @success 200 {object} systemInfoResponse "Success"
// @failure 500 "Server error"
// @router /status/system [get]
func (handler *Handler) statusSystem(w http.ResponseWriter, r *http.Request) *httperror.HandlerError {
	environments, err := handler.dataStore.Endpoint().Endpoints()
	if err != nil {
		return httperror.InternalServerError("Failed to get environment list", err)
	}

	agents := 0
	edgeAgents := 0
	edgeDevices := 0

	for _, environment := range environments {
		if endpointutils.IsAgentEndpoint(&environment) {
			agents++
		}

		if endpointutils.IsEdgeEndpoint(&environment) {
			edgeAgents++
		}

		if environment.IsEdgeDevice {
			edgeDevices++
		}

	}

	return response.JSON(w, &systemInfoResponse{
		EdgeAgents:  edgeAgents,
		EdgeDevices: edgeDevices,
		Agents:      agents,
		Platform:    platform.DetermineContainerPlatform(),
	})
}
